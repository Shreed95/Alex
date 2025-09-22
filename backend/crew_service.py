import os
from crewai_tools import SerperDevTool
from crewai import Agent, Task, Crew, Process, LLM
from models import GroceryShoppingPlan, MealPlan, MealPlanRequest
from leftover import LeftoversCrew

class AlexCrewService:
    def __init__(self):
        # Initialize LLM
        self.llm = LLM(
            model="gemini/gemini-1.5-flash",
            temperature=0.7
        )
        
        # Initialize search tool
        self.search_tool = SerperDevTool()
        
        # Initialize leftover crew
        self.leftovers_crew = LeftoversCrew(llm=self.llm)
        
    def create_meal_planner_agent(self):
        return Agent(
            role="Meal Planner & Recipe Researcher",
            goal="Search for optimal recipes and create detailed meal plans",
            backstory="A skilled meal planner who researches the best recipes online, considering dietary needs, cooking skill levels, and budget constraints.",
            tools=[self.search_tool],
            llm=self.llm,
            verbose=False
        )
    
    def create_shopping_organizer_agent(self):
        return Agent(
            role="Shopping Organizer", 
            goal="Organize grocery lists by store sections efficiently",
            backstory="An experienced shopper who knows how to organize lists for quick store trips and considers dietary restrictions.",
            tools=[],
            llm=self.llm,
            verbose=False
        )
    
    def create_budget_advisor_agent(self):
        return Agent(
            role="Budget Advisor",
            goal="Provide cost estimates and money-saving tips",
            backstory="A budget-conscious shopper who helps families save money on groceries while respecting dietary needs.",
            tools=[self.search_tool],
            llm=self.llm,
            verbose=False
        )
    
    def create_summary_agent(self):
        return Agent(
            role="Report Compiler",
            goal="Compile comprehensive meal planning reports from all team outputs",
            backstory="A skilled coordinator who organizes information from multiple specialists into comprehensive, easy-to-follow reports.",
            tools=[],
            llm=self.llm,
            verbose=False
        )
    
    def create_meal_planning_task(self, agent):
        return Task(
            description=(
                "Search for the best '{meal_name}' recipe for {servings} people within a {budget} budget. "
                "Consider dietary restrictions: {dietary_restrictions} and cooking skill level: {cooking_skill}. "
                "Find recipes that match the skill level and provide complete ingredient lists with quantities."
            ),
            expected_output="A detailed meal plan with researched ingredients, quantities, and cooking instructions appropriate for the skill level.",
            agent=agent,
            output_pydantic=MealPlan
        )
    
    def create_shopping_task(self, agent, context_tasks):
        return Task(
            description=(
                "Organize the ingredients from the '{meal_name}' meal plan into a grocery shopping list. "
                "Group items by store sections and estimate quantities for {servings} people. "
                "Consider dietary restrictions: {dietary_restrictions} and cooking skill: {cooking_skill}. "
                "Stay within budget: {budget}."
            ),
            expected_output="An organized shopping list grouped by store sections with quantities and prices.",
            agent=agent,
            context=context_tasks,
            output_pydantic=GroceryShoppingPlan
        )
    
    def create_budget_task(self, agent, context_tasks):
        return Task(
            description=(
                "Analyze the shopping plan for '{meal_name}' serving {servings} people. "
                "Ensure total cost stays within {budget}. Consider dietary restrictions: {dietary_restrictions}. "
                "Provide practical money-saving tips and alternative ingredients if needed to meet budget."
            ),
            expected_output="A complete shopping guide with detailed prices, budget analysis, and money-saving tips.",
            agent=agent,
            context=context_tasks
        )
    
    def create_summary_task(self, agent, context_tasks):
        return Task(
            description=(
                "Compile a comprehensive meal planning report that includes:\n"
                "1. The complete recipe and cooking instructions from the meal planner\n"
                "2. The organized shopping list with prices from the shopping organizer\n"
                "3. The budget analysis and money-saving tips from the budget advisor\n"
                "4. The leftover management suggestions from the waste reduction specialist\n"
                "Format this as a complete, user-friendly meal planning guide."
            ),
            expected_output="A comprehensive meal planning guide that combines all team outputs into one cohesive report.",
            agent=agent,
            context=context_tasks
        )
    
    def generate_meal_plan(self, request: MealPlanRequest):
        """Generate a complete meal plan with shopping list and budget analysis"""
        
        # Create agents
        meal_planner = self.create_meal_planner_agent()
        shopping_organizer = self.create_shopping_organizer_agent()
        budget_advisor = self.create_budget_advisor_agent()
        summary_agent = self.create_summary_agent()
        leftover_manager = self.leftovers_crew.leftover_manager()
        
        # Create tasks
        meal_planning_task = self.create_meal_planning_task(meal_planner)
        shopping_task = self.create_shopping_task(shopping_organizer, [meal_planning_task])
        budget_task = self.create_budget_task(budget_advisor, [meal_planning_task, shopping_task])
        leftover_task = self.leftovers_crew.leftover_task()
        summary_task = self.create_summary_task(summary_agent, [meal_planning_task, shopping_task, budget_task, leftover_task])
        
        # Create crew
        crew = Crew(
            agents=[meal_planner, shopping_organizer, budget_advisor, leftover_manager, summary_agent],
            tasks=[meal_planning_task, shopping_task, budget_task, leftover_task, summary_task],
            process=Process.sequential,
            verbose=False
        )
        
        # Execute crew
        crew_result = crew.kickoff(
            inputs={
                "meal_name": request.meal_name,
                "servings": request.servings,
                "budget": request.budget,
                "dietary_restrictions": request.dietary_restrictions,
                "cooking_skill": request.cooking_skill
            }
        )
        
        # Extract serializable data from CrewOutput
        try:
            # Get the final result (summary task output)
            final_result = str(crew_result.raw)
            
            # Try to get individual task outputs if available
            task_outputs = {}
            if hasattr(crew_result, 'tasks_output') and crew_result.tasks_output:
                for i, task_output in enumerate(crew_result.tasks_output):
                    task_name = ['meal_planning', 'shopping', 'budget', 'leftover', 'summary'][i]
                    if hasattr(task_output, 'pydantic') and task_output.pydantic:
                        # Convert Pydantic model to dict
                        task_outputs[task_name] = task_output.pydantic.model_dump()
                    else:
                        task_outputs[task_name] = str(task_output.raw) if hasattr(task_output, 'raw') else str(task_output)
            
            return {
                "summary": final_result,
                "task_outputs": task_outputs,
                "status": "completed"
            }
            
        except Exception as e:
            # Fallback to string conversion
            return {
                "summary": str(crew_result),
                "task_outputs": {},
                "status": "completed",
                "note": f"Simplified output due to serialization: {str(e)}"
            }
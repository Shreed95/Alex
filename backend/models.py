from pydantic import BaseModel, Field
from typing import List

class GroceryItem(BaseModel):
    """Individual grocery item"""
    name: str = Field(..., description="Name of the grocery item")
    quantity: str = Field(..., description="Quantity needed (for example, '2 lbs', '1 gallon')")
    estimated_price: str = Field(..., description="Estimated price (for example, '$3-5')")
    category: str = Field(..., description="Store section (for example, 'Produce', 'Dairy')")

class MealPlan(BaseModel):
    """Simple meal plan"""
    meal_name: str = Field(..., description="Name of the meal")
    difficulty_level: str = Field(..., description="'Easy', 'Medium', 'Hard'")
    servings: int = Field(..., description="Number of people it serves")
    researched_ingredients: List[str] = Field(default_factory=list, description="Ingredients found through research")

class ShoppingCategory(BaseModel):
    """Store section with items"""
    section_name: str = Field(..., description="Store section (for example, 'Produce', 'Dairy')")
    items: List[GroceryItem] = Field(default_factory=list, description="Items in this section")
    estimated_total: str = Field(..., description="Estimated cost for this section")

class GroceryShoppingPlan(BaseModel):
    """Complete simplified shopping plan"""
    total_budget: str = Field(..., description="Total planned budget")
    meal_plans: List[MealPlan] = Field(default_factory=list, description="Planned meals")
    shopping_sections: List[ShoppingCategory] = Field(default_factory=list, description="Organized by store sections")
    shopping_tips: List[str] = Field(default_factory=list, description="Money-saving and efficiency tips")

class MealPlanRequest(BaseModel):
    """Request model for meal planning"""
    meal_name: str = Field(..., description="Requested meal name")
    servings: int = Field(..., description="Number of servings")
    budget: str = Field(..., description="Budget for the meal plan")
    dietary_restrictions: List[str] = Field(default_factory=list, description="Dietary restrictions if any")
    cooking_skill: str = Field(default="beginner", description="Cooking skill level (default: beginner)")

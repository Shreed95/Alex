# Alex - Structured Meal & Grocery Planner Backend

A Flask-based backend API that uses CrewAI to generate intelligent meal plans and grocery shopping lists.

## Features

- **Intelligent Meal Planning**: Uses AI agents to research recipes and create detailed meal plans
- **Smart Shopping Lists**: Organizes ingredients by store sections with price estimates
- **Budget Analysis**: Provides cost estimates and money-saving tips
- **Leftover Management**: Suggests creative ways to use leftover ingredients
- **Dietary Restrictions**: Supports various dietary needs and restrictions
- **Skill-based Planning**: Adapts recipes to cooking skill levels

## API Endpoints

### Health Check
```
GET /health
```
Returns API health status.

### Generate Meal Plan
```
POST /api/meal-plan
```
Generate a complete meal plan with shopping list and budget analysis.

**Request Body:**
```json
{
  "meal_name": "Chicken Stir Fry",
  "servings": 4,
  "budget": "$25",
  "dietary_restrictions": ["gluten-free"],
  "cooking_skill": "beginner"
}
```

### Get Supported Meals
```
GET /api/meal-plans
```
Returns list of supported meal types and configuration options.

### Get Configuration
```
GET /api/config
```
Returns API configuration status and supported features.

## Setup Instructions

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Configure Environment Variables
Copy the example environment file and add your API keys:
```bash
cp .env.example .env
```

Edit `.env` and add:
- `SERPER_API_KEY`: For web search functionality
- `ANTHROPIC_API_KEY`: For AI model access

### 3. Run the Application
```bash
# Using the run script (recommended)
python run.py

# Or directly with Flask
python app.py
```

The API will be available at `http://localhost:5000`

### 4. Test the API
```bash
# Run the test suite
python test_api.py

# Or test individual endpoints
curl http://localhost:5000/health
```

## Project Structure

```
backend/
├── app.py              # Main Flask application
├── models.py           # Pydantic data models
├── crew_service.py     # CrewAI service wrapper
├── leftover.py         # Leftover management crew
├── run.py              # Startup script
├── test_api.py         # API test suite
├── requirements.txt    # Python dependencies
├── .env.example        # Environment variables template
├── config/
│   ├── agents.yaml     # CrewAI agent configurations
│   └── tasks.yaml      # CrewAI task configurations
└── README.md           # This file
```

## Usage Examples

### Basic Meal Planning
```bash
curl -X POST http://localhost:5000/api/meal-plan \
  -H "Content-Type: application/json" \
  -d '{
    "meal_name": "Pasta Carbonara",
    "servings": 2,
    "budget": "$15",
    "dietary_restrictions": [],
    "cooking_skill": "intermediate"
  }'
```

### Vegetarian Meal with Restrictions
```bash
curl -X POST http://localhost:5000/api/meal-plan \
  -H "Content-Type: application/json" \
  -d '{
    "meal_name": "Mediterranean Bowl",
    "servings": 4,
    "budget": "$20",
    "dietary_restrictions": ["vegetarian", "gluten-free"],
    "cooking_skill": "beginner"
  }'
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `SERPER_API_KEY` | Yes | API key for web search functionality |
| `ANTHROPIC_API_KEY` | Yes | API key for Claude AI model |
| `FLASK_ENV` | No | Set to 'development' for debug mode |
| `PORT` | No | Server port (default: 5000) |
| `CREW_VERBOSE` | No | Enable verbose CrewAI logging |

## Error Handling

The API returns structured error responses:

```json
{
  "error": "Error message description",
  "status": "error"
}
```

Common error codes:
- `400`: Bad Request (invalid input data)
- `500`: Internal Server Error (API key issues, processing errors)

## Development

### Adding New Meal Types
1. Update the `supported_meals` list in `app.py`
2. Test with the new meal type

### Modifying AI Behavior
1. Edit agent configurations in `config/agents.yaml`
2. Update task descriptions in `config/tasks.yaml`
3. Modify agent creation in `crew_service.py`

## Troubleshooting

1. **API Key Errors**: Ensure both `SERPER_API_KEY` and `ANTHROPIC_API_KEY` are set
2. **Import Errors**: Run `pip install -r requirements.txt`
3. **Port Conflicts**: Change the `PORT` environment variable
4. **Timeout Issues**: Increase request timeout for complex meal plans
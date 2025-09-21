#!/usr/bin/env python3
"""
Startup script for the Alex Meal Planner API
"""
import os
import sys
from app import app, logger

def setup_environment():
    """Setup environment variables from .env file"""
    if os.path.exists('.env'):
        from dotenv import load_dotenv
        load_dotenv()
        logger.info("Loaded environment variables from .env file")
    else:
        logger.warning("No .env file found. Please create one based on .env.example")

def check_dependencies():
    """Check if required dependencies are available"""
    try:
        import crewai
        import flask
        import pydantic
        logger.info("All required dependencies are available")
        return True
    except ImportError as e:
        logger.error(f"Missing dependency: {e}")
        logger.error("Please install dependencies using: pip install -r requirements.txt")
        return False

if __name__ == '__main__':
    logger.info("Starting Alex Meal Planner API...")
    
    # Setup environment
    setup_environment()
    
    # Check dependencies
    if not check_dependencies():
        sys.exit(1)
    
    # Check API keys
    missing_keys = []
    if not os.getenv('SERPER_API_KEY'):
        missing_keys.append('SERPER_API_KEY')
    if not os.getenv('ANTHROPIC_API_KEY'):
        missing_keys.append('ANTHROPIC_API_KEY')
    
    if missing_keys:
        logger.warning(f"Missing API keys: {', '.join(missing_keys)}")
        logger.warning("Some functionality may not work properly")
    
    # Start the application
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('FLASK_ENV') == 'development'
    
    logger.info(f"Server starting on http://localhost:{port}")
    logger.info("Available endpoints:")
    logger.info("  GET  /health - Health check")
    logger.info("  POST /api/meal-plan - Generate meal plan")
    logger.info("  GET  /api/meal-plans - Get supported meals")
    logger.info("  GET  /api/config - Get API configuration")
    
    app.run(host='0.0.0.0', port=port, debug=debug)
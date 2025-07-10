import { RecipeCard } from "../components/RecipeCard";
import { useState, useEffect } from "react";
import { getRecipes } from "../services/api";


function Saved() {
    const [savedRecipes, setSaveRecipes] = useState([]);
    useEffect(() => {
        getRecipes().then(response => setSaveRecipes(response.recipes));
    }, []);


    return (
        <div className="min-h-screen pt-16">
            <div className="max-w-5xl mx-auto px-6 py-4">
                <div className="text-center mb-4">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-trasnparent">
                        My saved recipes
                    </h1>
                </div>

                <div className="max-w-5xl mx-auto space-y-8">
                    {savedRecipes.map((recipe, index) => (
                        <RecipeCard key={index} recipe={recipe} />
                    ))}
                </div>
            </div>
        </div>
    )

}

export default Saved;
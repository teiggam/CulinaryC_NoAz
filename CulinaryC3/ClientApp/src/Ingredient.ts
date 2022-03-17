
export interface Ingredient {
    id:                number;
    original:          string;
    originalName:      string;
    name:              string;
    amount:            number;
    unit:              string;
    unitShort:         string;
    unitLong:          string;
    possibleUnits:     string[];
    estimatedCost:     EstimatedCost;
    consistency:       string;
    shoppingListUnits: string[];
    aisle:             string;
    image:             string;
    meta:              any[];
    nutrition:         Nutrition;
    categoryPath:      string[];
}

export interface EstimatedCost {
    value: number;
    unit:  string;
}

export interface Nutrition {
    nutrients:        Flavonoid[];
    properties:       Flavonoid[];
    flavonoids:       Flavonoid[];
    caloricBreakdown: CaloricBreakdown;
    weightPerServing: WeightPerServing;
}

export interface CaloricBreakdown {
    percentProtein: number;
    percentFat:     number;
    percentCarbs:   number;
}

export interface Flavonoid {
    name:   string;
    title:  string;
    amount: number;
    unit:   Unit;
}

export enum Unit {
    Empty = "",
    G = "g",
    Iu = "IU",
    Kcal = "kcal",
    Mg = "mg",
    Îœg = "Âµg",
}

export interface WeightPerServing {
    amount: number;
    unit:   Unit;
}

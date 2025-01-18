function determineRarity(){
     const rarityRoll = Math.random();//numero entre 0 y 1
     if (rarityRoll < 0.6) return "comun";
     if(rarityRoll < 0.85) return "rara";
     if(rarityRoll < 0.97) return "epica";
     return "legendaria";
}
function generateWeaponStats(rarity, level){
    const stats = {
        comun: {min: 1, max: 10},
        rara:{ min: 10, max: 20},
        epica: { min: 20, max: 35},
        legendaria:{ min: 35, max: 50},
    }
    const range = stats[rarity];
    const levelMultiplier = 1 + level * 0.1; //incremento del 10% x level
    return {
        true_damage: Math.floor((Math.random() * (range.max - range.min + 1) + range.min) * levelMultiplier),
        fisical_damage: Math.floor((Math.random() * (range.max - range.min + 1) + range.min) * levelMultiplier),
        magic_damage: Math.floor((Math.random() * (range.max - range.min + 1) + range.min) * levelMultiplier),
        crit_chance: parseFloat((Math.min(((Math.random() * (range.max - range.min) + range.min) / 100) * levelMultiplier, 1.0)).toFixed(2)),
        crit_damage: parseFloat((Math.min(((Math.random() * (range.max - range.min) + range.min) / 100) * levelMultiplier, 1.0)).toFixed(2)),
        atack_speed: parseFloat((Math.min(((Math.random() * (range.max - range.min) + range.min) / 10) * levelMultiplier, 5.0)).toFixed(2)),
        fisical_pen: Math.floor((Math.random() * (range.max - range.min + 1) + range.min) * levelMultiplier),
        magic_pen: Math.floor((Math.random() * (range.max - range.min + 1) + range.min) * levelMultiplier),
        price: Math.floor((Math.random() * (range.max * 100 - range.min * 100 + 1) + range.min * 100) * levelMultiplier),
        level: level,
    }
}
const generateWeaponName = (rarity) => {
    const prefixes = {
        comun: ["Simple", "Usado", "Rústico", "Común"],
        rara: ["Fino", "Valiente", "Poderoso", "Refinado"],
        epica: ["Épico", "Brillante", "Ancestral", "Sagrado"],
        legendaria: ["Legendario", "Divino", "Imparable", "Eterno"]
    };
    const bases = ["Espada", "Hacha", "Varita", "Báculo"];
    const suffixes = {
        comun: ["de Madera", "de Hierro", "Rota", "Frágil"],
        rara: ["de Plata", "Forjada", "de los Vientos", "de los Guardianes"],
        epica: ["del Fénix", "de los Dioses", "Inquebrantable", "Eterna"],
        legendaria: ["de la Eternidad", "del Caos", "del Héroe", "de los Dragones", "del Cosmos"]
    };
    const prefix = prefixes[rarity][Math.floor(Math.random() * prefixes[rarity].length)];
    const base = bases[Math.floor(Math.random() * bases.length)];
    const suffix = suffixes[rarity][Math.floor(Math.random() * suffixes[rarity].length)];

    return `${prefix} ${base} ${suffix}`;
}

module.exports = {
    determineRarity,
    generateWeaponStats,
    generateWeaponName
}
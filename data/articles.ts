export interface Article {
  slug: string;
  title: string;
  blurb: string;
  category: "start-here" | "cultivation-basics" | "troubleshooting" | "cooking-storage";
  content: string;
}

export const articleCategories: { value: Article["category"]; label: string }[] = [
  { value: "start-here", label: "Start here" },
  { value: "cultivation-basics", label: "Cultivation basics" },
  { value: "troubleshooting", label: "Troubleshooting" },
  { value: "cooking-storage", label: "Cooking & storage" },
];

export const articles: Article[] = [
  {
    slug: "what-is-grain-spawn",
    title: "What is grain spawn?",
    blurb: "Grain spawn is sterilized grain that’s been colonized by mushroom mycelium. It’s the \"seed\" you use to inoculate a larger substrate.",
    category: "cultivation-basics",
    content: "Grain spawn is the bridge between a small culture (liquid or agar) and a bulk substrate. We use rye grain: it’s sterilized, inoculated in a clean environment, and fully colonized before it leaves our lab. When you receive it, you break it up and mix it into pasteurized straw, sawdust, or another bulk substrate. The mycelium then colonizes that substrate and eventually fruits. Fresh spawn performs best—use within 2–4 weeks of receipt and store cool if you can’t use it right away.",
  },
  {
    slug: "liquid-culture-what-youre-buying",
    title: "Liquid culture: what you’re actually buying",
    blurb: "A sterile syringe of nutrient broth colonized by mycelium. Here’s what’s in it and how to use it.",
    category: "cultivation-basics",
    content: "Liquid culture (LC) is a sterile, nutrient-rich solution that’s been inoculated with mushroom mycelium. What you’re buying is a syringe filled with that living culture—ready to inject into grain jars, agar plates, or other sterile media. We prepare our LC in a laminar flow hood and test for contamination before shipping. LC expands easily: you can use a few milliliters to inoculate many jars, or make more LC in a sterile way. Store refrigerated and use within a few months for best viability.",
  },
  {
    slug: "contamination-how-to-spot-it",
    title: "Contamination: how to spot it early",
    blurb: "Bacteria and molds can ruin a grow. Learn the signs and what to do when you see them.",
    category: "troubleshooting",
    content: "Contamination shows up as colors or smells that don’t belong: green, black, or pink mold; slimy or sour-smelling bacteria; or yellow metabolites (mycelium stress). The earlier you spot it, the better. Isolate contaminated containers immediately—don’t open them in your main grow space. If it’s in grain spawn, don’t use it for bulk. Good sterile technique, clean spawn, and pasteurized substrate are your best prevention. When in doubt, toss it and start again with clean materials.",
  },
  {
    slug: "humidity-vs-fresh-air",
    title: "Humidity vs fresh air: the two knobs that matter",
    blurb: "Fruiting mushrooms need moisture and oxygen. Getting the balance right is the key to full, healthy flushes.",
    category: "cultivation-basics",
    content: "Mushrooms need high humidity to form and grow, but they also produce CO₂ and need fresh air. Too much humidity without enough air exchange leads to long, stringy stems and small caps. Too much air and not enough humidity dries out pins and causes aborts. The goal is a steady, high humidity (often 85–95% RH) with gentle air exchange—fans on timers or cracked lids, plus misting or a humidifier. Every space is different; watch your fruits and adjust. It’s the single most important skill in fruiting.",
  },
  {
    slug: "how-to-store-fresh-mushrooms",
    title: "How to store fresh mushrooms so they last",
    blurb: "Paper bags, airflow, and the fridge. Simple rules for keeping your harvest in good shape.",
    category: "cooking-storage",
    content: "Mushrooms need to breathe. Store them in a paper bag in the fridge—never in a sealed plastic bag, which traps moisture and speeds decay. If you don’t have a paper bag, a container lined with a dry paper towel works. Use within 5–7 days for best texture and flavor. For longer storage, you can dry or freeze them (cooked or raw); dried mushrooms keep for months and rehydrate well in soups and sauces.",
  },
  {
    slug: "first-grow-what-to-expect",
    title: "Your first grow: what to expect",
    blurb: "A realistic timeline and checklist for beginners starting with a kit or spawn.",
    category: "start-here",
    content: "If you’re using a grow kit: expect to see pins in 1–2 weeks after opening, and harvest in another 5–10 days. If you’re using grain spawn and bulk substrate: colonization takes 1–3 weeks depending on species and conditions; then you induce fruiting (light, fresh air, humidity) and wait for pins. First flushes are the heaviest; you may get 2–3 flushes from one block or bed. Patience and cleanliness matter more than speed. We’re here to help with questions—check our other guides or reach out.",
  },
  {
    slug: "pasteurization-vs-sterilization",
    title: "Pasteurization vs sterilization",
    blurb: "When to pasteurize (straw, manure) and when to sterilize (grain, sawdust).",
    category: "cultivation-basics",
    content: "Pasteurization heats substrate enough to kill most competitors but leaves some beneficial microbes; it’s used for straw, manure, and some outdoor beds. Sterilization (pressure cooker or autoclave) aims to kill everything; it’s required for grain and for most wood-based substrates that you’ll grow on indoors. Grain spawn is always sterilized. Bulk substrate can be pasteurized or sterilized depending on the method. Don’t skip the process—contamination is the number one cause of failed grows.",
  },
  {
    slug: "when-to-harvest",
    title: "When to harvest",
    blurb: "How to tell when your mushrooms are ready to pick.",
    category: "cultivation-basics",
    content: "Harvest when caps have opened but before they flatten and drop spores. For oysters: pick when the cap edge is still slightly inrolled or just flattening. For Lion’s Mane: when the spines are long and dangling but still white and tender. For King Oyster: when the cap is still firm and the stem is thick. Twist or cut at the base; avoid leaving stumps that can rot. Harvest in the morning if you can—they’re firmer and store better.",
  },
  {
    slug: "cooking-fresh-vs-dried",
    title: "Cooking with fresh vs dried mushrooms",
    blurb: "When to use fresh, when to use dried, and how to get the most from both.",
    category: "cooking-storage",
    content: "Fresh mushrooms shine in quick cooks—sautés, grilling, roasting—where their texture and moisture matter. Dried mushrooms concentrate umami and are ideal for broths, braises, and sauces; rehydrate in warm water and use the soaking liquid too. You can also powder dried mushrooms and use them as a seasoning. We sell fresh for local customers and focus on quality at harvest so you get the best of both worlds.",
  },
  {
    slug: "faq-cultures-and-spawn",
    title: "FAQ: Cultures and spawn",
    blurb: "Common questions about liquid culture, grain spawn, storage, and shipping.",
    category: "start-here",
    content: "**How long does liquid culture last?** Refrigerated, 3–6 months. Use earlier for best results. **Can I ship grain spawn?** Yes; we ship insulated. Local pickup is preferred when possible to avoid transit stress. **What if my spawn looks wet or smells off?** Don’t use it. Contact us for a replacement if it arrived that way. **Do you test for contamination?** Yes. We work in a laminar flow hood and visually inspect before shipping. We stand by our product.",
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: Article["category"]): Article[] {
  return articles.filter((a) => a.category === category);
}

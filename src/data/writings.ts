export interface Writing {
  slug: string;
  date: string;
  title: string;
  type: string;
  excerpt: string;
  content: string[];
}

export const writings: Writing[] = [
  {
    slug: "knowledge-vs-understanding",
    date: "December 2024",
    title: "On the Difference Between Knowledge and Understanding",
    type: "Essay",
    excerpt: "Knowledge accumulates; understanding transforms. The distinction matters for how we approach learning and action.",
    content: [
      "There is a difference between knowing that something is true and understanding why it is true. This distinction, often collapsed in modern discourse, carries profound implications for how we learn, how we teach, and how we act.",
      "Knowledge can be transmitted. Understanding must be developed. A student can memorize the formula for compound growth, can recite the mathematics of exponential curves, can even apply the formula correctly to novel problems—and still not understand what exponential growth means, what it feels like, what it implies for systems that exhibit it.",
      "Understanding involves integration. It means the concept has been woven into the fabric of how we perceive reality. When we understand something, we see it everywhere. We recognize its patterns in contexts far removed from where we first encountered it. Understanding changes us; knowledge merely adds to our inventory.",
      "The Codex prioritizes understanding over knowledge. Its purpose is not to catalog facts about living systems but to develop perception—the capacity to see the patterns that govern organization, persistence, and transformation across scales.",
      "This is why physical practice matters. We can know that soil is alive without understanding what that means. Working with soil—observing its responses over seasons and years, feeling the difference between dead and living earth—develops understanding that reading alone cannot provide.",
      "The distinction also matters for how we approach failure. When we merely know something, failure feels like a problem with our knowledge—we must have been missing some fact. When we understand something, failure becomes informative—it reveals the limits of our understanding and points toward what we have not yet integrated.",
      "In a culture saturated with information, the capacity for understanding has become rare. We have access to more knowledge than any civilization in history, yet our understanding often seems shallow. The Codex is an attempt to reverse this pattern—to develop understanding that can guide action across contexts we have not yet imagined."
    ]
  },
  {
    slug: "soil-temperature-year-three",
    date: "November 2024",
    title: "Soil Temperature Observations, Year Three",
    type: "Field Note",
    excerpt: "Continuous monitoring reveals patterns invisible to casual observation. The soil remembers what the air forgets.",
    content: [
      "Three years of continuous soil temperature monitoring at Habitat One have begun to reveal patterns that shorter observation periods cannot detect. These notes summarize key observations and emerging questions.",
      "The most striking finding is the thermal stability of mature compost beds compared to bare soil. At 30cm depth, temperature fluctuations in composted areas are roughly 40% smaller than in adjacent uncovered ground. This buffering effect persists year-round but is most pronounced during temperature extremes—both summer heat and winter cold.",
      "We hypothesize that this stability results from multiple factors: the insulating properties of organic matter, the thermal mass of soil biology, and the moisture-retention characteristics of compost. Disentangling these factors will require controlled experiments we have not yet designed.",
      "A second observation concerns the relationship between soil temperature and root activity. Our crude measurements suggest that root growth accelerates when soil temperatures reach approximately 12°C and slows dramatically above 28°C. These thresholds appear consistent across the perennial species we are monitoring, though annual crops show more variation.",
      "The practical implication is that mulching strategies significantly extend the growing season—not by warming the soil faster in spring (mulch actually delays spring warming) but by moderating summer heat stress and extending productive growth into autumn.",
      "We have also observed temperature gradients between the centers and edges of planted beds. Edge temperatures are more variable, which may partly explain the different growth patterns we observe in edge plants. This has led us to experiment with wider beds and to plant more sensitive species toward bed centers.",
      "Three years is still a short time in soil terms. Many of the patterns we think we see may be artifacts of unusual weather years. The value of continued observation is precisely that it allows us to distinguish signal from noise—to identify which patterns persist across varying conditions and which are merely circumstantial.",
      "Next year we plan to add moisture monitoring at multiple depths. Temperature and moisture together may reveal patterns that neither dataset shows alone."
    ]
  },
  {
    slug: "feedback-loops-communities",
    date: "October 2024",
    title: "Feedback Loops in Small Communities",
    type: "Working Paper",
    excerpt: "The same patterns that stabilize ecosystems also stabilize human groups. Recognizing them changes how we build institutions.",
    content: [
      "This paper explores the hypothesis that the feedback mechanisms which maintain stability in natural ecosystems have structural parallels in small human communities. If this hypothesis is correct, it has implications for how we design institutions and social structures.",
      "In ecosystem terms, negative feedback loops are stabilizing. When a population grows too large, resource scarcity or predation increases, reducing the population. When it shrinks too far, resources become abundant and predation pressure decreases, allowing recovery. The system oscillates around an equilibrium rather than careening toward extremes.",
      "Positive feedback loops, by contrast, amplify change. Success breeds success; failure breeds failure. Left unchecked, positive feedback drives systems toward collapse or explosion. Both outcomes represent the breakdown of systemic integrity.",
      "In small communities, we observe analogous patterns. Reputation systems function as negative feedback—success beyond community norms triggers social pressure that moderates ambition, while failure triggers support that prevents total collapse. These mechanisms are often implicit, embedded in custom and relationship rather than formal rules.",
      "Modern institutions have largely replaced these implicit feedback systems with explicit rules and market mechanisms. This shift has enabled larger-scale coordination but has also removed many of the stabilizing pressures that small communities maintained automatically.",
      "The question is whether we can design institutions that preserve the benefits of scale while reintroducing the stabilizing feedback that human-scale systems provided. This is not a matter of returning to the past but of understanding the structural requirements for stability and finding new ways to meet them.",
      "Our preliminary observations at Habitat One suggest several principles: frequent face-to-face interaction, shared physical labor, visible consequences for actions, and timescales long enough for feedback to operate. These conditions are difficult to maintain as groups grow larger, which may explain why human societies have consistently struggled with the transition from small-scale to large-scale organization.",
      "This remains a working paper. The observations are preliminary and the theoretical framework is underdeveloped. We share it in the spirit of open inquiry, inviting refinement and critique."
    ]
  },
  {
    slug: "water-flow-diagrams",
    date: "September 2024",
    title: "Preliminary Diagrams: Water Flow Patterns",
    type: "Diagram Series",
    excerpt: "Water reveals landscape. Careful observation of flow patterns shows us what contour maps cannot.",
    content: [
      "This collection of diagrams documents our evolving understanding of water movement across Habitat One. The drawings are preliminary—sketches rather than finished maps—and will be revised as observation continues.",
      "Our initial assumption was that water would follow the contour lines shown on topographic maps. Three years of observation during rain events has revealed a more complex reality. Microtopography—variations of just a few centimeters—significantly influences flow patterns, especially during light rain when water moves slowly.",
      "The first diagram series shows observed flow paths during different rainfall intensities. Light rain (under 5mm/hour) follows subtle depressions invisible on contour maps. Moderate rain (5-15mm/hour) begins to follow contours more predictably. Heavy rain (over 15mm/hour) overwhelms microtopographic guidance and flows according to gross landscape shape.",
      "A second series documents seasonal variation. Spring flows differ from autumn flows even at similar rainfall intensities. We hypothesize this relates to soil moisture content, vegetation cover, and frozen ground patterns. The soil's 'memory' of previous conditions shapes how it receives new water.",
      "The third series maps the relationship between surface flow and infiltration zones. Certain areas consistently absorb water; others consistently shed it. These patterns correlate loosely with soil composition but not perfectly—biological factors seem to play a role we do not yet understand.",
      "These diagrams have practical applications. We have adjusted swale placement based on observed rather than predicted flow paths. We have identified high-infiltration zones suitable for recharge basins and high-runoff zones where earthworks can redirect water.",
      "But the diagrams are also exercises in perception. Drawing forces attention. The act of mapping water movement has taught us to see patterns we previously overlooked. This may be their greatest value—not as finished documents but as tools for developing understanding.",
      "Future work will attempt to correlate these surface observations with subsurface water movement. We suspect the two are related in complex ways that our current monitoring does not capture."
    ]
  },
  {
    slug: "what-failure-teaches",
    date: "August 2024",
    title: "What Failure Teaches",
    type: "Essay",
    excerpt: "The curriculum of failure is more reliable than the curriculum of success. This has implications for how we learn.",
    content: [
      "We learn more from failure than from success. This claim, repeated so often it has become cliché, deserves more careful examination. What exactly does failure teach that success cannot?",
      "Success confirms our models. When we act and the outcome matches our expectations, we receive information that our understanding is adequate—at least for this context, at this time. But we learn nothing new about the boundaries of that adequacy. Success tells us we are within the zone where our models work; it does not reveal where that zone ends.",
      "Failure marks boundaries. When we act and the outcome diverges from expectation, we have encountered a limit of our understanding. The specific nature of the failure carries information about the specific nature of that limit. Failure is a map of the territory beyond our current understanding.",
      "This asymmetry has implications for how we structure learning. A curriculum designed around success—around replicating known solutions to known problems—develops competence within established boundaries but does not prepare learners to recognize or navigate beyond those boundaries.",
      "A curriculum that incorporates meaningful failure—not failure as punishment but failure as information—develops a different kind of competence. It produces learners who expect to encounter limits, who have practiced the process of revising understanding in response to unexpected outcomes.",
      "At Habitat One, we have tried to build this orientation into our practice. We document failures as carefully as successes. We treat unexpected outcomes as data rather than mistakes. We resist the temptation to explain away failures or to blame them on execution rather than conception.",
      "This is psychologically difficult. Failure feels bad. Our instinct is to avoid it, minimize it, forget it. But this instinct, however natural, impedes learning. The practice of attending to failure—really attending, without defensiveness or rationalization—is a skill that must be developed.",
      "None of this means we seek failure or that all failures are equally valuable. Random failure teaches nothing; only failure that results from sincere attempts to apply our understanding carries information. And some failures are too costly to risk regardless of their educational value. The art is in finding the zone where failure is informative and the costs are bearable.",
      "This essay is itself an attempt to articulate something we are still learning. We do not fully understand the pedagogy of failure. We only know that attending to it has repeatedly revealed patterns we would otherwise have missed."
    ]
  }
];

export const getWritingBySlug = (slug: string): Writing | undefined => {
  return writings.find(w => w.slug === slug);
};

export const getAdjacentWritings = (slug: string): { prev: Writing | null; next: Writing | null } => {
  const index = writings.findIndex(w => w.slug === slug);
  return {
    prev: index > 0 ? writings[index - 1] : null,
    next: index < writings.length - 1 ? writings[index + 1] : null
  };
};

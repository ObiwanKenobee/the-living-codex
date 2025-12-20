const entries = [
  {
    date: "December 2024",
    title: "On the Difference Between Knowledge and Understanding",
    type: "Essay"
  },
  {
    date: "November 2024",
    title: "Soil Temperature Observations, Year Three",
    type: "Field Note"
  },
  {
    date: "October 2024",
    title: "Feedback Loops in Small Communities",
    type: "Working Paper"
  },
  {
    date: "September 2024",
    title: "Preliminary Diagrams: Water Flow Patterns",
    type: "Diagram Series"
  },
  {
    date: "August 2024",
    title: "What Failure Teaches",
    type: "Essay"
  }
];

const WritingsSection = () => {
  return (
    <section id="writings" className="section-spacing border-t divider">
      <div className="container-reading">
        <p className="font-sans-nav text-muted-foreground mb-4 tracking-widest">
          VI
        </p>
        <h2 className="text-3xl md:text-4xl font-light mb-8">
          Writings & Field Notes
        </h2>
        <p className="prose-codex mb-12">
          An evolving archive of essays, observations, diagrams, and working 
          papers. This is not a blog—it is a research notebook, updated as 
          understanding develops.
        </p>

        <div className="space-y-1">
          {entries.map((entry, index) => (
            <article 
              key={index}
              className="group py-4 border-b divider last:border-b-0 cursor-pointer"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="font-sans-nav text-xs text-muted-foreground mb-1 tracking-wider">
                    {entry.date} · {entry.type}
                  </p>
                  <h3 className="text-lg text-reading group-hover:text-foreground transition-colors duration-300">
                    {entry.title}
                  </h3>
                </div>
                <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-300 mt-1">
                  →
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Archive continues →
          </p>
        </div>
      </div>
    </section>
  );
};

export default WritingsSection;

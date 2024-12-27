type TermsSectionContainerProps = {
  title?: string;
  content: string;
  list?: string[];
};

function TermsSectionContainer({
  title,
  content,
  list,
}: TermsSectionContainerProps) {
  return (
    <section className="mt-10">
      {title && (
        <h1
          className={`${title === "Privacy Policy" ? "text-center text-2xl" : "text-xl"} font-medium`}
        >
          {title}
        </h1>
      )}
      <p className="mt-5 text-sm leading-6 sm:text-base sm:leading-8">
        {content}
      </p>
      <ul className="mt-1 text-sm leading-6 sm:text-base sm:leading-8">
        {list?.map((item, index) => (
          <li key={index} className="list-inside list-disc">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TermsSectionContainer;

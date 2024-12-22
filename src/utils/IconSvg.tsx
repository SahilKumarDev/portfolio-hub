export const StarSvg = ({ fill }: { fill: string }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none">
      <path
        className={`${fill}`}
        d="M6.958.713a1 1 0 0 0-1.916 0l-.999 3.33-3.33 1a1 1 0 0 0 0 1.915l3.33.999 1 3.33a1 1 0 0 0 1.915 0l.999-3.33 3.33-1a1 1 0 0 0 0-1.915l-3.33-.999-1-3.33Z"
      ></path>
    </svg>
  );
};

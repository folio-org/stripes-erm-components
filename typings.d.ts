// allow TypeScript to permit importing CSS files -- copied from ui-calendar
declare module '*.css' {
  const styles: { [className: string]: string };
  export = styles;
}

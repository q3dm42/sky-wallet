function LoaderBlock({ text }) {
  return (
    <div className="loader-block">
      <div className="loader-spinner" />
      <p>{text}</p>
    </div>
  );
}

export default LoaderBlock;

export default function Button(props) {
  return (
    <button
      onClick={props.onClick}
      className="text-lg cursor-pointer font-bold py-2 px-6 rounded-lg border-2 border-cyan-600 bg-transparent hover:bg-[var(--ifm-color-primary)] hover:text-white transition-all duration-300">
      {props.children}
    </button>
  );
}
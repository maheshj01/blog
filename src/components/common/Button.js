export default function Button(props) {
    return (
      <button
        onClick={props.onClick}
        className="text-lg button cursor-pointer bg-gradient-to-br from-green-300 to-blue-800 hover:from-green-400 hover:to-blue-900 text-white font-bold py-2 px-6 rounded-lg border-0">
        {props.children}
      </button>
    );
  }
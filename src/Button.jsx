export function Button({ onClick, children }) {
	return (
		<button
			onClick={onClick}
			className="bg-blue-600 hover:bg-blue-500 focus:bg-blue-500 active:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-blue-500 rounded-md px-4 py-1 font-medium"
		>
			{children}
		</button>
	);
}

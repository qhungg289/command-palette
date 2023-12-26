import { createPortal } from "react-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";

const items = [
	{ id: 1, name: "Item 1", description: "Description for Item 1" },
	{ id: 2, name: "Item 2", description: "Description for Item 2" },
	{ id: 3, name: "Item 3", description: "Description for Item 3" },
	{ id: 4, name: "Item 4", description: "Description for Item 4" },
	{ id: 5, name: "Item 5", description: "Description for Item 5" },
	{ id: 6, name: "Item 6", description: "Description for Item 6" },
	{ id: 7, name: "Item 7", description: "Description for Item 7" },
	{ id: 8, name: "Item 8", description: "Description for Item 8" },
	{ id: 9, name: "Item 9", description: "Description for Item 9" },
	{ id: 10, name: "Item 10", description: "Description for Item 10" },
];

export function CommandPalette({ show, handleClose }) {
	const textInputRef = useRef(null);
	const [searchString, setSearchString] = useState("");
	const filteredItems = searchString
		? items.filter((item) => item.name.toLowerCase().includes(searchString))
		: items;

	useEffect(() => {
		if (show && textInputRef.current) {
			textInputRef.current.focus();
		}
	}, [show]);

	function handleEscapeKeyPress(e) {
		e.preventDefault();

		if (e.key == "Escape") {
			handleClose();
		}
	}

	useEffect(() => {
		window.addEventListener("keyup", handleEscapeKeyPress);

		return () => {
			window.removeEventListener("keyup", handleEscapeKeyPress);
		};
	}, []);

	return createPortal(
		show ? (
			<div
				onClick={handleClose}
				className="fixed inset-0 flex items-center justify-center bg-zinc-950/50"
			>
				<div
					onClick={(e) => e.stopPropagation()}
					className="p-2 mx-2 flex flex-col bg-zinc-800 border border-zinc-700 rounded-md w-full max-w-screen-sm h-2/4 max-h-96"
				>
					<input
						ref={textInputRef}
						type="text"
						value={searchString}
						onChange={(e) => setSearchString(e.target.value)}
						className="bg-zinc-700 rounded border border-zinc-600 placeholder:text-zinc-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-2 py-1 w-full"
						placeholder="Search by name..."
					/>
					<div
						id="command-palette"
						className="flex flex-1 flex-col gap-2 mt-2 overflow-y-auto"
					>
						{filteredItems.map((item) => (
							<div key={item.id} className="px-2 py-1 rounded">
								<p>{item.name}</p>
								<p className="text-zinc-500 text-xs">
									{item.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		) : null,
		document.body
	);
}

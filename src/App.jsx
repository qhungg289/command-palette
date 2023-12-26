import { useEffect, useState } from "react";
import { Button } from "./Button";
import { CommandPalette } from "./CommandPalette";

function App() {
	const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

	function handleButtonClick() {
		setIsCommandPaletteOpen(true);
	}

	function handleCommandPaletteClose() {
		setIsCommandPaletteOpen(false);
	}

	function handleShortCutPress(e) {
		const keyName = e.key;

		if (keyName == "Control") return;

		if (e.ctrlKey && keyName == "p") {
			e.preventDefault();
			setIsCommandPaletteOpen(true);
		}
	}

	useEffect(() => {
		window.addEventListener("keydown", handleShortCutPress);

		return () => {
			window.removeEventListener("keydown", handleShortCutPress);
		};
	}, []);

	return (
		<div className="min-h-screen flex flex-col items-center justify-center">
			<Button onClick={handleButtonClick}>Open</Button>
			<p className="mt-2 text-zinc-600">
				Or press <kbd>Ctrl</kbd> + <kbd>P</kbd> to open the command
				palette.
			</p>
			<CommandPalette
				show={isCommandPaletteOpen}
				handleClose={handleCommandPaletteClose}
			/>
		</div>
	);
}

export default App;

import { Application, Container, Graphics, Point, Text } from "pixi.js";
import "./style.css";
import { useDrag, useZoom } from "pixi-gesture-hooks";

function main(target?: HTMLElement) {
	if (!target) {
		throw new Error("main: Could not initialize app; Target element not found.");
	}

	const app = new Application({
		resizeTo: target,
		backgroundColor: "lightgray"
	});

	const canvas = new Container();

	const area = { width: 300, height: 300 };
	const movableArea = new Graphics()
		.beginFill("black")
		.drawRect(0, 0, area.width, area.height);

	const helloWorld = new Text("Hello world!", {
		fill: "white",
		fontSize: 48 * (area.width / 800)
	});

	helloWorld.anchor.set(0.5, 0.5);
	helloWorld.position.set(area.width / 2, area.height / 2);

	movableArea.addChild(helloWorld);
	// movableArea.position.set(app.view.width / 2, + app.view.height / 2);

	useDrag(movableArea, { enableAcceleration: true, bounds: [
		new Point(app.view.width - area.width, app.view.height - area.height),
		new Point(0, 0),
	] });
	
	useZoom(movableArea, { minScale: 0.01, maxScale: 2, scaleFactor: 0.001, enablePinch: true });
	
	// important to prevent overscroll
	target.addEventListener("wheel", e => e.preventDefault());
	
	canvas.addChild(movableArea);

	app.stage.addChild(canvas);
	target.appendChild(app.view as HTMLCanvasElement);
	console.log("initialized!");
}

document.addEventListener("DOMContentLoaded", () => main(document.getElementById("app")));
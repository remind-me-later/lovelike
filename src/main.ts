import { HasGravity } from "./component/has_gravity.ts";
import { BoundingBox } from "./component/bounding_box.ts";
import { Velocity } from "./component/velocity.ts";
import { ECS } from "./ecs.ts";
import { Painter } from "./system/painter.ts";
import { Gravity } from "./system/gravity.ts";
import { Collisions } from "./system/collisions.ts";
import { Controller } from "./system/controller.ts";
import { Controllable } from "./component/controllable.ts";
import { Movement } from "./system/movement.ts";

function main() {
	const ecs = new ECS();

	ecs.addSystem(1, new Controller(ecs));
	ecs.addSystem(2, new Gravity(ecs));

	// Order matters here
	ecs.addSystem(3, new Movement(ecs));
	ecs.addSystem(4, new Collisions(ecs));

	const painter = new Painter(ecs);
	ecs.addSystem(5, painter);

	const floor = ecs.addEntity();
	ecs.addComponent(
		floor,
		new BoundingBox(
			painter.width / 2,
			painter.height - 50,
			painter.width,
			100,
		),
	);

	const leftWall = ecs.addEntity();
	ecs.addComponent(
		leftWall,
		new BoundingBox(25, painter.height / 2, 50, painter.height),
	);

	const rightWall = ecs.addEntity();
	ecs.addComponent(
		rightWall,
		new BoundingBox(
			painter.width - 25,
			painter.height / 2,
			50,
			painter.height,
		),
	);

	const box = ecs.addEntity();
	ecs.addComponent(box, new BoundingBox(200, painter.height - 125, 50, 50));

	const floatingBox = ecs.addEntity();
	ecs.addComponent(floatingBox, new BoundingBox(300, 450, 50, 50));

	const floatingBox2 = ecs.addEntity();
	ecs.addComponent(floatingBox2, new BoundingBox(400, 400, 50, 50));

	const player = ecs.addEntity();
	ecs.addComponent(player, new BoundingBox(100, 10, 32, 32));
	ecs.addComponent(player, new Velocity(0, 0));
	ecs.addComponent(player, new HasGravity());
	ecs.addComponent(player, new Controllable());

	let lastTime = 0;
	function update(time: number) {
		const deltaTime = time - lastTime;
		lastTime = time;

		ecs.update(deltaTime);
		requestAnimationFrame(update);
	}

	requestAnimationFrame(update);
}

main();

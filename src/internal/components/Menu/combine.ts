import type {MenuItemSpec, TypedMenuItemSpec} from "@int/components/Menu/types.ts";
import {type MenuType, MenuTypes} from "@int/components/Menu/MenuTypes.ts";

function inferType(spec: MenuItemSpec): MenuType {
	if (spec.type) return spec.type;
	if (spec.sub) return MenuTypes.SUB;
	return MenuTypes.ACTION;
}

function infer(spec: MenuItemSpec): TypedMenuItemSpec {
	if (spec.type) return spec as TypedMenuItemSpec;
	return { ...spec, type: inferType(spec) } as TypedMenuItemSpec;
}

function inferAll(spec: MenuItemSpec): TypedMenuItemSpec {
	const inferred = infer(spec);
	if (inferred.sub) {
		inferred.sub = inferred.sub.map(item => inferAll(item));
	}
	return inferred;
}

export default function combine(menus: MenuItemSpec[]) {
	let menuOut: TypedMenuItemSpec & { sub: MenuItemSpec[] } = {
		name: "root",
		type: MenuTypes.SUB,
		sub: [],
	};

	if (!menus.length) return menuOut;

	const inferredBaseMenu = inferAll(menus[0]);

	if (inferredBaseMenu.type === MenuTypes.SUB && inferredBaseMenu.sub) {
		menuOut = {...inferredBaseMenu, sub: [...inferredBaseMenu.sub]};
	}

	for (const menu of menus.slice(1)) {
		const typedMenu = infer(menu);
		if (typedMenu.type !== MenuTypes.SUB || !typedMenu.sub) {
			menuOut.sub.push(typedMenu);
			continue;
		}

		const subsByName: Record<string | symbol, MenuItemSpec & { sub: MenuItemSpec[] }> = Object.fromEntries(menuOut.sub.filter(m => inferType(m) === MenuTypes.SUB).map(sub => [sub.name, sub]));
		for (const sub of typedMenu.sub) {
			if (sub.type === MenuTypes.SEPARATOR) {
				continue;
			}
			if (sub.type !== MenuTypes.SUB || !sub.sub) {
				menuOut.sub.push(sub);
				continue;
			}

			if (subsByName[sub.name]) {
				subsByName[sub.name].sub.push(...sub.sub);
				continue;
			}
			menuOut.sub.push(sub);
			subsByName[sub.name] = sub;
		}
	}

	return menuOut;
}
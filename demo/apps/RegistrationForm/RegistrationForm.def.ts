import LauncherIconWith from "@/components/Launcher/LauncherIconWith";
import icon from "@/assets/icons/computer.png";
import RegistrationForm from "./RegistrationForm.vue";

export const id = Symbol("RegistrationForm");
export default {
	id,
	displayName: "Register Now!",
	component: RegistrationForm,
	launcherIcon: LauncherIconWith({ src: icon }),
};

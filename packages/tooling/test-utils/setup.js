import { config } from "@vue/test-utils";
import { DataSelectorPlugin } from "./common-plugins.js";

config.plugins.VueWrapper.install(DataSelectorPlugin);

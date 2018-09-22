import Component from "can-component";
import DefineMap from "can-define/map/map";
import stache from "can-stache";
import canViewModel from "can-view-model";

Component.extend({
  tag: "the-spinner",

  ViewModel: DefineMap.extend({
    value: {
      default: 0
    },

    formattedValue: {
      get() {
        return this.formatter(this.value);
      }
    },

    min: {
      set(min) {
        if (this.value < min) {
          this.value = min;
        }
        return min;
      }
    },

    max: {
      set(max) {
        if (this.value > max) {
          this.value = max;
        }
        return max;
      }
    }
  }),

  view: `<p>{{{formattedValue}}}</p>`
});

Component.extend({
  tag: "spinner-wrapper",

  ViewModel: DefineMap.extend({
    mode: {
      default: "ECO"
    },
    value: {
      set(newVal) {
        return newVal + 30;
      }
    },
    minValue: {
      get() {
        return this.mode === "AUTO" ? 20 : 30;
      }
    },
    maxValue: {
      get() {
        return this.mode === "AUTO" ? 40 : 50;
      }
    },
    formatter(val) {
      return `${val.toFixed(0)}<span>&deg;</span>`;
    }
  }),

  view: `
    <the-spinner
      value:bind="value"
      max:from="minValue"
      min:from="maxValue"
      formatter:from="formatter"
    />
  `
});

const frag = stache("<spinner-wrapper />")()
document.querySelector("body").appendChild(frag);

const vm = canViewModel("spinner-wrapper");
vm.mode = "AUTO";

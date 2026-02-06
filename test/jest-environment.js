const NodeEnvironment = require('jest-environment-node').TestEnvironment;

/**
 * Custom Jest environment that prevents the localStorage/sessionStorage warning
 * from Node.js v25+ by patching globalThis before Jest environment initialization
 */

// Patch globalThis immediately to prevent the warning
const props = ['localStorage', 'sessionStorage'];
props.forEach((prop) => {
  if (prop in globalThis) {
    try {
      Object.defineProperty(globalThis, prop, {
        value: undefined,
        writable: true,
        enumerable: false,
        configurable: true,
      });
    } catch (e) {
      // Ignore if can't override
    }
  }
});

class CustomNodeEnvironment extends NodeEnvironment {
  constructor(config, context) {
    super(config, context);

    // Also patch the environment's global object
    props.forEach((prop) => {
      if (prop in this.global) {
        try {
          Object.defineProperty(this.global, prop, {
            value: undefined,
            writable: true,
            enumerable: false,
            configurable: true,
          });
        } catch (e) {
          // Ignore if can't override
        }
      }
    });
  }
}

module.exports = CustomNodeEnvironment;

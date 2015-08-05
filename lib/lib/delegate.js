"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = delegate;

function delegate(that, what, whom) {
  that[what] = whom[what].bind(whom);
}

module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvZGVsZWdhdGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7cUJBQXdCLFFBQVE7O0FBQWpCLFNBQVMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO0FBQ2pELE1BQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQ3BDIiwiZmlsZSI6ImRlbGVnYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGVsZWdhdGUodGhhdCwgd2hhdCwgd2hvbSkge1xuICB0aGF0W3doYXRdID0gd2hvbVt3aGF0XS5iaW5kKHdob20pO1xufVxuIl19
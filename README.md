# Proto Plugins 

A collection of plugins for the [proto](https://github.com/moonrepo/proto) tool manager adding support for Hylo tools.

## `hylo` plugin - Hylo's compiler
Plugin for installing the [Hylo compiler](https://github.com/hylo-lang/hylo-new).

- Install globally:
```shell
proto plugin add hylo "source:https://raw.githubusercontent.com/hylo-lang/proto-toml-plugins/main/hylo/plugin.toml" --global
proto install hylo
```
- Install per project:
```shell
proto plugin add hylo "source:https://raw.githubusercontent.com/hylo-lang/proto-toml-plugins/main/hylo/plugin.toml"
proto pin hylo latest --resolve
```

You can then run `hc --help`.

Minimum supported OS versions:
- MacOS 15
- Ubuntu 24.04 (or GLibc >= 2.39)
- Windows 11

## Contributing

### How to add a new plugin to this repository:

1. Generate a `plugin.toml` following the [docs](https://moonrepo.dev/docs/proto/non-wasm-plugin).
2. Write a `plugin.test.ts` for the plugin that tests whether it's installed successfully.
4. Run test locally by `npm test`

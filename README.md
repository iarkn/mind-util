# mind-util

[![build-status](https://img.shields.io/github/workflow/status/iarkn/mind-util/Gradle%20(Push)/main?style=flat-square)](https://github.com/iarkn/mind-util/actions)

A client-side Mindustry mod that contains useful tools or utilities.

[*Wiki*](https://github.com/iarkn/mind-util/wiki)  
[*Trello*](https://trello.com/b/RR3Os2FB/mind-util)  
[*Discord*](https://discord.gg/mfU3TgfyWg)

## Installation

You can find the list of stable builds in [Releases](https://github.com/iarkn/mind-util/releases).

Builds are also done automatically on each commit. These builds can be found in `Actions > workflow-run > Artifacts`, make sure to unzip it to get the actual JAR file. Note that any changes can occur at any moment.

## Building

### Prerequisites

- [Git](https://git-scm.com/downloads) or download the source code as ZIP
- [JDK 16](https://adoptium.net) or above
- Android SDK (for Android builds)

### Desktop

```
git clone https://github.com/iarkn/mind-util.git
cd mind-util
./gradlew jar
```

Build output will be in `build/libs`. If you are on Windows, do `gradlew jar` to build the project.

### Android

1. Download and unzip the [command line tools](https://developer.android.com/studio/#command-tools) for Android Studio to `$HOME/Android/`* or any directory you prefer.
2. Set `ANDROID_SDK_ROOT` to `$HOME/Android` or your preferred directory.
3. Install the latest version of `platforms` and `build-tools`.
4. Include `$ANDROID_SDK_ROOT/build-tools/<version>` in the PATH environment variable.
5. Do `./gradlew deploy` on Linux/MacOS or `gradlew deploy` on Windows.

_\* If you are using Windows, you can put it in `C:\Android\` or something._

## License

MIT

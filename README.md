# mind-util

[![build-status](https://img.shields.io/github/workflow/status/iarkn/dialoq/Gradle%20CI/master?style=flat-square)](https://github.com/iarkn/mind-util/actions)

A client-side Mindustry mod that contains useful tools.

[*Documentation*](https://github.com/iarkn/mind-util/wiki)
[*Trello*](https://trello.com/b/RR3Os2FB/mind-util)

## Installation

You can find stable builds in [Releases](https://github.com/iarkn/mind-util/releases)

Builds are also done automatically on each commit. These builds can be found in Actions > workflow-run > Artifacts, make sure to unzip it to get the actual JAR file. Note that any changes can occur at any moment.

## Building

### Prerequisites

- [Git](https://git-scm.com/downloads) or download the source code as ZIP
- [JDK 16](https://adoptium.net) or above
- Android platform and build tools (for Android builds)

### Desktop

```
git clone https://github.com/iarkn/mind-util.git
cd mind-util
./gradlew jar
```

Build output will be in `build/libs`. If you are on Windows, do `gradlew jar` to build the project.

### Android

Download and unzip Android Studio [command line tools](https://developer.android.com/studio/#command-tools). Install the latest `platforms` and `build-tools`. Set the environment variable `ANDROID_SDK_ROOT` to your Android SDK directory and include `$ANDROID_SDK_ROOT/build-tools/<version>` in the PATH environment variable.

To build the project, do `./gradlew deploy` on Linux/MacOS or `gradlew deploy` on Windows.

## License

MIT

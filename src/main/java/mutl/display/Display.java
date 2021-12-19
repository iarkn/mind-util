package mutl.display;

import arc.*;

import mindustry.graphics.*;

public class Display {
    public String name, localizedName;
    public String info;
    /** Visibility options: ally, enemy, player. */
    public boolean[] options = {false, false, false};
    public float layer = Layer.overlayUI;

    private int bits = 0;
    private Runnable run;

    Display(String name, Runnable run) {
        this.name = name;
        this.localizedName = Core.bundle.get("display." + name, name);
        this.info = Core.bundle.getOrNull("display." + name + ".info");
        this.run = run;

        loadOptions();
    }

    public boolean enabled() {
        return bits > 0;
    }

    public void run() {
        run.run();
    }

    private void loadOptions() {
        var opt = Core.settings.get(name, 0);
        // Check if setting is an integer to avoid casting issues
        if (opt instanceof Integer) {
            bits = (int) opt;
        } else {
            Core.settings.remove(name);
        }

        for (int i = 0; i < options.length; i++) {
            options[i] = (bits & 1 << i) != 0 ? true : false;
        }
    }

    public void saveOptions() {
        bits = 0;

        for (int i = 0; i < options.length; i++) {
            bits |= (options[i] ? 1 : 0) << i;
        }

        Core.settings.put(name, bits);
    }

    public boolean getOption(DisplayOption option) {
        loadOptions();
        return options[option.ordinal()];
    }

    public void setOption(DisplayOption option, boolean check) {
        options[option.ordinal()] = check;
        saveOptions();
    }
}

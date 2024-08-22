import os
import subprocess
import sys
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

if __name__ == "__main__":
    app_path = None
    path_exists = False
    args = sys.argv

    subprocess_args = [
        "python",
        os.path.join(BASE_DIR, "manage.py"),
        "startapp",
    ]

    if len(args) > 1:
        app_path = args[2] if len(args) > 2 else f"{BASE_DIR}/apps/{args[1]}"
        path_exists = Path(app_path).exists()

        subprocess_args += [args[1]] + [app_path] if app_path else []

        Path(app_path).mkdir(parents=True, exist_ok=True)

    try:
        subprocess.check_output(subprocess_args, stderr=subprocess.STDOUT)

        if len(args) > 1:
            filedata = None
            with open(f"{app_path}/apps.py", "r") as file:
                filedata = (
                    file.read()
                    .replace(f'name = "{args[1]}"', f'name = "apps.{args[1]}"')
                    .replace(f"name = '{args[1]}'", f"name = 'apps.{args[1]}'")
                )
            with open(f"{app_path}/apps.py", "w") as file:
                file.write(filedata)

        try:
            subprocess.check_output(
                ["python", "-m", "black", app_path],
                stderr=subprocess.STDOUT,
            )
        except:
            pass

    except subprocess.CalledProcessError as err:
        if app_path and not path_exists:
            Path(app_path).rmdir()

        raise Exception(f"\n\n{err.output.decode()}")

import re

with open("src/pages/RoadmapFlow.test.tsx", "r") as f:
    content = f.read()

# Let's temporarily skip the `RoadmapFlow.test.tsx` file for now if it's the only failure,
# or actually, we should just revert the file to the original state and apply `act` around `closeCompletionModalIfOpen()`.
# Wait, let's just restore it completely.
import subprocess
subprocess.run(["git", "checkout", "origin/main", "--", "src/pages/RoadmapFlow.test.tsx"])

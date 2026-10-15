import re

with open("src/pages/RoadmapFlow.test.tsx", "r") as f:
    content = f.read()

content = content.replace(
'''  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";''',
'''  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";'''
)

with open("src/pages/RoadmapFlow.test.tsx", "w") as f:
    f.write(content)

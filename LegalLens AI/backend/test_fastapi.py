from fastapi import FastAPI

app = FastAPI()

@app.post("/x")
def f():
    return {"ok": True}

print(type(app))
print(app.routes)

for route in app.routes:
    print(type(route), getattr(route, "path", "NO PATH"))
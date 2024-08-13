import json

from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    msg = {"message": "Hello World"}
    return msg


class ItemPartial(BaseModel):
    name: str
    price: int
    image: str


class Item(ItemPartial):
    id: int


class ItemList(BaseModel):
    items: list[Item]


@app.get("/products")
async def get_products():
    with open("./sample/data.json", "r", encoding="utf-8") as f:
        print(f)
        data = json.load(f)

    # item = Item(name="Pencil", id=1, price=200)

    return ItemList(items=data)


@app.get("/products/{item_id}")
async def get_product_by_id(item_id: int):
    with open("./sample/data.json", "r", encoding="utf-8") as f:
        data = json.load(f)

    items_model = ItemList(items=data)
    items = items_model.items
    item = next((item for item in items if item.id == item_id), None)

    return item


@app.put("/products", status_code=status.HTTP_201_CREATED)
async def put_new_product(item: ItemPartial):
    with open("./sample/data.json", "r", encoding="utf-8") as f:
        data = json.load(f)

    items_model = ItemList(items=data)
    item_full = Item(**item.model_dump(), id=len(items_model.items) + 1)
    items_model.items.append(item_full)

    with open("./sample/data.json", "w", encoding="utf-8") as f:
        items_list = items_model.model_dump()
        json.dump(items_list["items"], f, indent=4)

    return True

# Track changes of mobx field in tree structure

## usage

```
const obj1 = observable({
    a: 1
})

const ft = new FieldTracker(obj1, 'a')
ft.hasChanges // false

obj1.a = 2;
ft.hasChanges // true

ft.reset();
ft.hasChanges // false

const obj2 = observable({
    b: 1
})

ft.add(new FieldTracker(obj2, 'b'))
obj2.b = 3;

ft.hasChanges // true
ft.reset()

ft.hasChanges // false
```

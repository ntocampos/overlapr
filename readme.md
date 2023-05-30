# Overlapr

Overlapr is a conflict detection tool that will help you represent them graphically on your UI, regardless of the application.

## Installation

Yarn

```bash
yarn add overlapr
```

NPM

```bash
npm install overlapr
```

## Usage

```jsx
import overlapr from 'overlapr'

const data = overlapr.processData(rawData)
const {start, end, width, height, offset} = data['some-id']
```

### API

**Input**

The main function expects an array of objects to be analyzed as its first parameter. Each of those objects should have at least the following properties:

```tsx
type InputObject = {
  id?: string,
  start?: number,
  end?: number,
}[]
```

It's ok to have more properties tho, they will just be ignored by Overlapr.

As we can see, all attributes are optional because your objects might not have this specific format and it might be too expensive to transform them before passing in Overlapr. That's where the `config` parameter comes in. There, you can define custom getters for each one of those attributes, like so:

```tsx
type Config = {
  getId?: (InputObject) => string,
  getStart?: (InputObject) => number,
  getEnd?: (InputObject) => number,
}
```

With this configuration object, you can have your input property values in any way you want, as long as getter functions return the correct data.

Notice that either one of those (be it the attribute or the attribute getter in the config) is necessary in order to get Overlapr working property. This means that you can have the `id` and `end` properties defined, but use the `getStart` function to get the `start` values.

**Output**

After running Overlapr on your entity collection, you'll get a hash object as the output, having your input IDs as the keys and  `OverlapItem`*s as* the values. The `OverlapItem` object contains information about the conflicts and how to render them on your UI. It follows the following format:

```tsx
type OverlapItem = {
  _original: InputObject
  id: string
  start: number
  end: number
  depth: number
  conflicts: string[]
  context: number
  offset: number
  width: number
  height: number
}

type Output = {
  _ordered: OverlapItem[],
  [id: string]: OverlapItem,
}
```

Here's an explanation of each one of those attributes. For detailed information with examples, please refer to the specs.

- `_original`: the original object from your input. It's here just for convenience, in case you need to easily access it when using the output data.
- `id`: your entry's ID.
- `start`: the start of the range. The same you provided via `start` attribute or `getStart` getter.
- `end`: the end of the range. The same you provided via `end` attribute or `getEnd` getter.
- `depth`: the depth where this element is positioned. It is used internally when calculating the `context`, `width`, and `offset`. It's made available just in case you need it for some reason, but you shouldn't need it.
- `conflicts`: an array containing the IDs of the elements that this entry overlaps.
- `context`: this represents the number of columns in the cluster in which this entry is inserted. It's used internally when calculating the `width` and `offset` for the entries.
- `offset`: this is the entry's offset relative to the cross-axis. Where it should start.
- `width`: the length of this entry relative to the cross-axis.
- `height`: the length of this entry relative to the main axis. This is calculated simply as `end - start`.

## Demo (WIP)

[https://codesandbox.io/p/sandbox/overlapr-demo-cus9ft?file=/src/App.tsx:9,1](https://codesandbox.io/p/sandbox/overlapr-demo-cus9ft?file=/src/App.tsx:9,1)

## Contributing

Pull requests are welcome, but please open an issue first to discuss what you would like to change before opening the pull request.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)

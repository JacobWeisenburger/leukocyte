# leukocyte
## Customizable validation with type inference

> Partial credit for the library name `leukocyte` goes to:
> - [IncrementDaily](https://github.com/IncrementDaily)
> - [MelissaWeisenburger](https://github.com/MelissaWeisenburger)

### TODO
- [ ] Add tests
- [ ] Add documentation
- [ ] infer `optional`/`nullable` prop types no matter where they are in the method chain. Currently, they only work if defined after the type specific methods.
   - I have tried this:
    ```ts
    readonly props: Props & {
        readonly optional: unknown extends Props[ 'optional' ] ? boolean | undefined : Props[ 'optional' ]
        readonly nullable: unknown extends Props[ 'nullable' ] ? boolean | undefined : Props[ 'nullable' ]
    }
    ```
- [ ] filter out props that are not valid for the baseType
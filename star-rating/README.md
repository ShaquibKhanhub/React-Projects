# Star Button Functionality

`onClick={() => setRating(num)}`: When a button (star) is clicked, it sets the rating state to the star's value (num).

`onMouseOver={() => setHover(num)}`: When the mouse hovers over a star, it sets the hover state to the star's value (num).

`onMouseLeave={() => setHover(num)}`: When the mouse leaves the star, it sets the hover state to the star's value (num).

```markdown
num <= ((rating && hover) || hover) ? "on" : "off"
```

- ### Explanation of the Expression:

  - (rating && hover): This part checks if rating is truthy (not 0). If rating is truthy, it returns the value of hover; otherwise, it returns false.

  - (rating && hover) || hover: If the first part (rating && hover) is false, it falls back to hover. This ensures that hover is used when rating is 0.

  - num <= ((rating && hover) || hover): If the current star's number (num) is less than or equal to this value, the star gets the on class, making it appear highlighted. Otherwise, it gets the off class, making it appear unhighlighted.

### Example Scenarios:

##### No rating selected, hovering over the 3rd star:

- `rating = 0, ` `hover = 3`
  `(rating && hover)`: This is `0 && 3`, which evaluates to `0`.
- `((rating && hover) || hover)`: This is `0 || 3`, which evaluates to `3`.
- So, stars `1`, `2`, and `3` will be `"on"`, and stars `4` and `5` will be `"off"`.

###### Rating selected at 4, hovering over the 2nd star:

- `rating = 4`, `hover = 2`
`(rating && hover)`: This is `4 && 2`, which evaluates to `2`.
- `((rating && hover) || hover)`: This is `2 || 2`, which evaluates to `2`.
- So, stars `1` and `2` will be `"on"`, and stars `3`, `4` and `5` will be `"off"`.

###### Rating selected at 4, not hovering over any star:

- `rating = 4`, `hover = 0`
- `(rating && hover)`: This is` 4 && 0`, which evaluates to 0.
`((rating && hover) || hover)`: This is `0 || 0`, which evaluates to `0`.
- So, all stars will be `"off"` since num is always greater than `0`.

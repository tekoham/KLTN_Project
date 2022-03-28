export const loremIpsumGenerator = (endOffset) => {
  const loremIpsum =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum arcu vel odio condimentum tristique. Praesent velit ligula, dapibus non laoreet in, scelerisque nec nibh. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed eleifend lectus placerat metus porta, a iaculis tortor sollicitudin. Sed sagittis eleifend massa. Aenean arcu massa, bibendum eu vehicula sed, auctor ut elit. Aliquam fermentum bibendum odio, hendrerit fermentum neque pretium quis. Curabitur et magna porta, laoreet eros at, vulputate mi. Morbi molestie mattis massa sed ultricies. Vestibulum quis arcu risus. Vestibulum augue turpis, luctus eget elit sit amet, suscipit ultricies metus. Suspendisse auctor augue massa, ac feugiat lectus sagittis eget tempus aliquam turpis diam amet feugiat lectus.'
  return loremIpsum.substring(0, endOffset)
}

const contentBlocksBuilder = (CmsTypeToComponentMapping) => {
    /**
    * @param blocks Content blocks that should be rendered.
    * @param variant The `wide` variant adds a wrapping Block component which automatically takes care of the whitespace, this is not necessary for the narrow variant.
    * The `narrow` variant handles whitespace by using the Trinity-Content class.
    * @param includeContainer This parameter is needed when ContentBlocks is used in combination with the `wide` variant but ContentBlocks is placed outside of a Container.
    */
    const MappedContentBlocks = ({ blocks, variant, includeContainer }: ContentBlocksProps) => {
    return blocks && blocks.length ? (
    <>
    {blocks.map((block, index) => {
    const className = block.contentType === 'hippostd:html' ? 'Trinity-Content' : '';
    const Component = CmsTypeToComponentMapping[block.contentType];
    if (!Component) {
    console.error(`Contentblock cannot be found: ${block.contentType}`);
    return null;
    }
    const WrappedComponent = includeContainer ? withContainer(Component, className) : Component;
   
    const isCallToAction = block.contentType === CmsTypeToComponentMapping['kvkwebsite:callToAction']
   
    // The index number is used for the key here. That is ok. It is a static list
    // of Blocks after the first render. It can not be sorted or edited. React will
    // not get confused about which Block is which.
    // prettier-ignore
    return (
    <Block
    className={classNames(className, 'br-block')}
    key={block.contentType + index}
    // Change .Hero to something else
    variant={isCallToAction && BlockVariants.Hero || componentToBlockVariantMapping[block.contentType] || BlockVariants.Generic}
    attributes={{ 'data-ui-test-class': 'content-blocks-wrapper' }}
    >
    <WrappedComponent {...block} key={block.contentType + index} contentBlockVariant={variant} />{/* NOSONAR */}
    </Block>
    );
    })}
    </>
    ) : null;
    };
    MappedContentBlocks.displayName = 'ContentBlocks';
    return MappedContentBlocks;
   };
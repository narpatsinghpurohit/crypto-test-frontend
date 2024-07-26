import React from 'react';

type LayoutComponentProps = {
    children: React.ReactNode;
};

type LayoutComponentType = React.ComponentType<LayoutComponentProps>;

type WrappedComponentType = React.ComponentType<any>;

const withLayout = (LayoutComponent: LayoutComponentType) => (
    WrappedComponent: WrappedComponentType
) => {
    const WithLayout: React.FC = (props) => (
        <LayoutComponent>
            <WrappedComponent {...props} />
        </LayoutComponent>
    );

    return WithLayout;
};

export default withLayout;
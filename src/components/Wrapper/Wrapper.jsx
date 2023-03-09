import PropTypes from 'prop-types';

export default function Wrapper({ children }) {
    return <main>
        {children}
    </main>
}

Wrapper.propTypes = {
    children: PropTypes.node,
}
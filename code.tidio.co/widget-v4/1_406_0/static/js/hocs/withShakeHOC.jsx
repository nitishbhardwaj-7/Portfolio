import React from 'react';

export function useShake(timeout = 820) {
    const [shakeClassName, setShakeClassName] = React.useState('');
    const clearId = React.useRef();

    function triggerShake() {
        setShakeClassName('shake');
        clearTimeout(clearId.current);
        clearId.current = null;
        clearId.current = setTimeout(() => {
            setShakeClassName('');
        }, timeout);
    }

    return {
        triggerShake,
        shakeClassName,
        shouldShake: shakeClassName === 'shake',
    };
}

export default function withShakeHOC(WrappedComponent) {
    return class WithShake extends React.Component {
        state = {
            shakeClassName: '',
        };

        clearId = null;

        isMounted = false;

        componentDidMount() {
            this.isMounted = true;
        }

        componentWillUnmount() {
            this.isMounted = false;
        }

        triggerShake = () => {
            this.setState({
                shakeClassName: 'shake',
            });
            clearTimeout(this.clearId);
            this.clearId = null;
            this.clearId = setTimeout(() => {
                if (this.isMounted) {
                    this.setState({
                        shakeClassName: '',
                    });
                }
            }, 820);
        };

        render() {
            const newProps = {
                triggerShake: this.triggerShake,
                shakeClassName: this.state.shakeClassName,
            };
            return <WrappedComponent {...this.props} {...newProps} />;
        }
    };
}

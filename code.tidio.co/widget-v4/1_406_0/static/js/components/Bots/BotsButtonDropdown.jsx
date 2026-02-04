import React from 'react';

import PropTypes from 'prop-types';

import { trans } from '../../helpers/translations';

import { Close, DeafultBotIcon } from '../svgIcons/SvgIcons';

const BotsButtonDropdown = (props) => (
    <div className="bots-dropdown">
        {props.isBotActive && (
            <ul className="bots-cancel">
                <li>
                    <span
                        tabIndex="0"
                        onClick={props.onCancelBotClick}
                        onKeyUp={(event) => {
                            const enterKeyCode = 13;
                            if (event.keyCode === enterKeyCode) {
                                props.onCancelBotClick();
                            }
                        }}
                        onFocus={props.onBotFocus}
                        onBlur={props.onBotBlur}
                        role="button"
                    >
                        <Close /> {trans('startOver', null, 'Start over')}
                    </span>
                </li>
            </ul>
        )}
        {!props.isBotActive && (
            <ul>
                <li>
                    <span
                        onClick={() => {
                            props.onBotClick();
                        }}
                        onKeyUp={(event) => {
                            const enterKeyCode = 13;
                            if (event.keyCode === enterKeyCode) {
                                props.onBotClick();
                            }
                        }}
                        onFocus={props.onBotFocus}
                        onBlur={props.onBotBlur}
                        role="button"
                        tabIndex={!props.isBotActive ? '0' : '-1'}
                    >
                        <DeafultBotIcon /> {trans('startTheBot', null, 'Start the Bot')}
                    </span>
                </li>
            </ul>
        )}
    </div>
);

BotsButtonDropdown.propTypes = {
    onBotClick: PropTypes.func.isRequired,
    onBotFocus: PropTypes.func.isRequired,
    onBotBlur: PropTypes.func.isRequired,
    onCancelBotClick: PropTypes.func.isRequired,
    isBotActive: PropTypes.bool.isRequired,
};

export default BotsButtonDropdown;

import * as React from 'react';
import classes from './BuildControl.css';

const buildControl = ({ label, disabled, ingredientRemoved, ingredientAdded }: Props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label} style={ { textTransform: 'capitalize' } }>{label}</div>
        <button className={classes.Less} onClick={ingredientRemoved} disabled={disabled}>
            Less
        </button>
        <button className={classes.More} onClick={ingredientAdded}>
            More
        </button>
    </div>
);

export interface Props {
    label: string;
    disabled: boolean;
    ingredientRemoved: () => void;
    ingredientAdded: () => void;
}

export default buildControl;
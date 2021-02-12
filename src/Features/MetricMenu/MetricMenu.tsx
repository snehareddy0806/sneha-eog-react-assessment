import React, { useEffect } from 'react';
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { getMetricsQuery } from '../../GraphqlQueries';
import { actions } from './reducer';
import { useQuery } from "urql";
import { IState } from '../../store';

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-end"
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 300,
        maxWidth: 400
    },
    chips: {
        display: "flex",
        flexWrap: "wrap"
    },
    chip: {
        margin: 2,
        backgroundColor: "white"
    },
}));

const handleChange = () => {

}
const MenuProps = {
    PaperProps: {
        style: {
            width: 300
        }
    }
};

export default () => {
    return (
        <MetricMenu />
    );
};

const getMetrics = (state: IState) => {
    return state.metrics.metricsList
}

const MetricMenu = () => {
    const classes = useStyles();
    const theme = useTheme();

    const dispatch = useDispatch();
    const metricsList = useSelector(getMetrics)
    const [result] = useQuery({ query: getMetricsQuery });
    const { data, error } = result;
    useEffect(() => {
        if (error) {
            dispatch(actions.metricsApiErrorReceived({ error: error.message }));
            return;
        }
        if (!data) return;
        const { getMetrics } = data;
        dispatch(actions.metricsListRecevied(getMetrics))
    }, [dispatch, data, error])
    return (
        <div className={classes.root}>
            <FormControl className={classes.formControl}>
                <InputLabel >Choose Metric</InputLabel>
                <Select
                    multiple
                    value={[]}
                    onChange={handleChange}
                    input={<Input id="select-multiple-chip" />}
                    MenuProps={MenuProps}
                >
                    {(metricsList).map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                        >
                            {name}
                        </MenuItem>)
                    )}
                </Select>
            </FormControl>
        </div>
    )
}
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import * as actions from '../actions';
import { getVisibleTodos, getErrorMessage, getIsFetching } from '../reducers';
import TodoList from '../components/TodoList';
import FetchError from '../components/FetchError';

class VisibleTodoList extends React.Component {
    componentDidMount() {
        this.fetchData();
    }
    componentDidUpdate(prevProps) {
        if(this.props.filter !== prevProps.filter) {
            this.fetchData();
        }
    }

    fetchData() {
        const { filter, fetchTodos } = this.props;
        fetchTodos(filter).then(() => console.log('done!'));
    }

    render() {
        const { toggleTodo, errorMessage, todos, isFetching } = this.props;
        if(isFetching && !todos.length) {
            return <p>Loading...</p>;
        }
        if(errorMessage && !todos.length) {
            return (
                <FetchError
                    message={errorMessage}
                    onRetry={() => this.fetchData()}
                />
            );
        }
        return <TodoList 
            todos={todos}
            onTodoClick={toggleTodo} />;
    }
}

VisibleTodoList.propTypes = {
    filter: PropTypes.oneOf(['all', 'active', 'completed']).isRequired,
    todos: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    fetchTodos: PropTypes.func.isRequired,
    toggleTodo: PropTypes.func.isRequired
}

const mapStateToProps = (state, { match }) => {
    const filter = match.params.filter || 'all';
    return {
        todos: getVisibleTodos(state, filter),
        isFetching: getIsFetching(state, filter),
        errorMessage: getErrorMessage(state, filter),
        filter
    }
}

// const mapDispatchToProps = (dispatch) => ({
//     onTodoClick(id) {
//         dispatch(actions.toggleTodo(id))
//     }
// })

VisibleTodoList = withRouter(connect(
    mapStateToProps,
    actions
)(VisibleTodoList));

export default VisibleTodoList;
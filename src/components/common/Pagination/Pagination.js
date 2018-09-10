import React, { Component } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import Button from '../Button';
import { Typography } from '@material-ui/core';

const PaginationContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
`;
const PaginationButtonsContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
`;

const PageInfoLabel = styled.div`
    display: flex;
    align-items: center;
    vertical-align: sub;
`;

const StyledTypography = styled(Typography)`
    color: #fff !important;
`;

export default class Pagination extends Component {
    
    constructor(props) {
        super(props);

        const { items } = props;
        this.state = {
            pageSize: 10,
            currentPage: 1,
            numberOfPages: Math.ceil(items.length / 10)
        };
    }

    componentDidUpdate(prevProps) {
        const prevItems = prevProps.items;
        const { items } = this.props;
        if (prevItems.length !== items.length || !_.isEqual(prevItems[0], items[0])) {
            const newState = {
                pageSize: 10,
                currentPage: 1,
                numberOfPages: Math.ceil(items.length / 10)
            };

            this.setState(newState);
        }
    }

    applyPagination = () => {
        const { items } = this.props;
        const { pageSize, currentPage } = this.state;
        const firstIndex = currentPage > 1 ? (pageSize * (currentPage - 1)) : 0;
        const lastIndex = items.length > (pageSize * currentPage) ? (pageSize * currentPage) : items.length; // use of slice means we want past the last index

        return items.slice(firstIndex, lastIndex);
    }

    changePage = (toNextPage = true) => () => {
        const newState = _.clone(this.state);
        const { currentPage, numberOfPages } = newState;
        if (toNextPage && currentPage !== numberOfPages) {
            ++newState.currentPage;
        } else if (!toNextPage && currentPage > 1) {
            --newState.currentPage;
        }

        this.setState(newState);
    }

    renderPageItems = () => {
        const { renderItems } = this.props;
        const items = this.applyPagination();

        return renderItems(items);
    }

    renderPaginationDetails = ({ currentPage, numberOfPages }) => {
        return (
            <PaginationContainer>
                <PageInfoLabel>
                    <StyledTypography>Page: {currentPage} of {numberOfPages}</StyledTypography>
                </PageInfoLabel>
                <PaginationButtonsContainer>
                    <Button handleOnClick={this.changePage(false)} disabled={currentPage === 1}><StyledTypography>Previous Page</StyledTypography></Button>
                    <Button primary handleOnClick={this.changePage()} disabled={currentPage === numberOfPages}><StyledTypography>Next Page</StyledTypography></Button>
                </PaginationButtonsContainer>
            </PaginationContainer>
        );
    }

    render() {
        return (
            <div>
                {this.renderPageItems()}
                {this.renderPaginationDetails(this.state)}
            </div>
        );
    }
}

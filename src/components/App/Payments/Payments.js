import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { capitalize } from 'lodash';
import dateformat from 'dateformat';

import CustomHeader from 'components/shared/CustomHeader';
import CurrentBalance from 'components/shared/CurrentBalance';
import AmountItem from 'components/shared/AmountItem';
import BottomButtons from 'components/shared/BottomButtons';
import LoadingIcon from 'components/shared/LoadingIcon';

import { toFixed } from 'utils';

import { Container, ScrollView, ItemContainer } from './styles';

class Payments extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    payments: PropTypes.array,
    stopWatchPayments: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    watchPayments: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.watchPayments();
  }

  componentWillUnmount() {
    this.props.stopWatchPayments();
  }

  handleBack = async () => {
    const { navigation } = this.props;

    await navigation.navigate('Dashboard');
  };

  renderItem = (payment) => {
    const { t } = this.props;
    const {
      id, asset, usdAmount, amount, cretaedAt, type,
    } = payment;

    const title = t(`payments.${type}`);
    const description = dateformat(cretaedAt, 'm/d/yy');
    const icon = `payment${capitalize(type)}`;
    const mainAmount = `${toFixed(amount)} ${asset.toUpperCase()}`;
    const secondaryAmount = `$${usdAmount.toFixed(2)}`;

    return (
      <ItemContainer key={id}>
        <AmountItem
          description={description}
          icon={icon}
          mainAmount={mainAmount}
          secondaryAmount={secondaryAmount}
          title={title}
        />
      </ItemContainer>
    );
  };

  render() {
    const { t, payments, navigation } = this.props;

    return (
      <Container>
        <CustomHeader
          onBackButtonPress={this.handleBack}
          title={t('payments.headerTitle')}
        >
          <CurrentBalance />
        </CustomHeader>

        {payments.length === 0 && <LoadingIcon />}

        <ScrollView>{payments.map(this.renderItem)}</ScrollView>

        <BottomButtons navigation={navigation} />
      </Container>
    );
  }
}

export default Payments;

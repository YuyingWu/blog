import React, { PureComponent } from 'react'
import { rhythm } from '../utils/typography.js'
import Typist from 'react-typist'
import queryString from 'qs'

import './liqing.less';

const list = [{
  content: <img src="http://sinacloud.net/blog-image/i-love-you.jpg" />
}, {
  content: <>
    <h1>Ma puce,</h1>
    <p>Les années passent.</p>
    <p>Cette obsession a grandi quand notre relation grandit.</p>
    <p>Votre Qing</p>
  </>,
}, {
  content: <>
    <h1>Ma puce,</h1>
    <p>J'ai envie de vivre avec toi.</p>
    <p>J'ai envie de vivre avec toi.</p>
    <p>Toute la vie, toute la vie.</p>
    <p>Votre Qing</p>
  </>,
}, {
  content: <>
    <h1>Ma puce,</h1>
    <p>Plus je te regarde, plus je t’aime et plus je t’aime plus je ressens le besoin de te regarder.</p>
    <p>Votre Qing</p>
  </>,
}, {
  content: <>
    <h1>Ma puce,</h1>
    <p>je t’aime.</p>
    <p>Votre 大猫</p>
  </>,
}, {
  content: <>
    <h1>Bonjour, Qing,</h1>
    <p>nice to meet you.</p>
    <p>Yours,<br />大猫</p>
  </>,
}, {
  content: <>
    <h1>初见</h1>
    <p>Qing: Salut!</p>
    <p>Yuying Wu: Salut!</p>
    <p>2018.10.30</p>
  </>,
}, {
  content: <>
    <p>“再见。”狐狸说。“喏，这就是我的秘密。很简单：只有用心才能看得清。实质性的东西，用眼睛是看不见的。”</p>
    <p>“实质性的东西，用眼睛是看不见的。”小王子重复着这句话，以便能把它记在心间。</p>
    <p>“正因为你为你的玫瑰花费了时间，这才使你的玫瑰变得如此重要。”</p>
    <p>“正因为你为你的玫瑰花费了时间……”小王子又重复着，要使自己记住这些。</p>
    <p>“人们已经忘记了这个道理，”狐狸说，“可是，你不应该忘记它。你现在要对你驯服过的一切负责到底。你要对你的玫瑰负责……”</p>
    <p>“我要对我的玫瑰负责……”小王子又重复着……</p>
  </>,
}];

class Home extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      content: '',
      isLoaded: true,
    }
  }

  componentDidMount() {
    const { index = -1 } = queryString.parse(window.location.search, { ignoreQueryPrefix: true });

    const randomIndex = index === -1 ? Math.floor(Math.random() * list.length) : index;

    // console.log(list[randomIndex].content)

    this.setState({
      content: list[randomIndex].content,
      // content: list[0].content,
    });
  }

  handlePreText = () => {
    this.setState({
      isLoaded: true,
    });
  }

  render() {
    const { content = '', isLoaded } = this.state;
    let display = content;

    if (content) {
      display = <Typist
        avgTypingSpeed={20}
        startDelay={100}
        cursor={{
          blink: true,
          hideWhenDone: true,
          hideWhenDoneDelay: 500,
        }}
      >
        {content.props.children}
      </Typist>
    }

    if (content.type === 'img') {
      display = content;
    }

    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
        className="page-liqing"
      >
        {/* { !isLoaded ? (
          <Typist onTypingDone={this.handlePreText}>
            <h1>Joyeux anniversaire, Qing!</h1>
            <p>Private space of Qing and WYY<Typist.Backspace count={12} delay={200} />小猫 and 大猫.</p>
            <Typist.Delay ms={500} />
          </Typist>
        ) : null } */}

        {isLoaded ? display : null}

        <footer className="wgt-footer">
          {/* <a href="/static/footsprint.html">我们的足迹 👣👣👣</a> */}
          Q&Y, 2019 - {(new Date()).getFullYear()}
          <p className="btn-refresh" onClick={() => { window.location.reload() }}>点我刷新</p>
        </footer>
      </div>
    )
  }
}

export default Home;

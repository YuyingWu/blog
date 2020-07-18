const Tag = ({ color = '', children }) => {
  let styles = {
    color: '',
    background: '',
    padding: '0 7px',
    margin: '0 8px 0 0',
    display: 'inline-block',
  }

  if (!color) {
    styles.color = '#2f54eb'
    styles.background = '#f0f5ff'
    styles.border = '1px solid #adc6ff'
  } else {
    styles.color = '#fff'
    styles.background = color
    styles.border = `1px solid ${color}`
  }

  return <span style={styles}>{children}</span>
}

export default Tag

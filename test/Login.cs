// Generated by Selenium IDE
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Firefox;
using OpenQA.Selenium.Remote;
using OpenQA.Selenium.Support.UI;
using OpenQA.Selenium.Interactions;
using NUnit.Framework;
[TestFixture]
public class LoginTest {
  private IWebDriver driver;
  public IDictionary<string, object> vars {get; private set;}
  private IJavaScriptExecutor js;
  [SetUp]
  public void SetUp() {
    driver = new ChromeDriver();
    js = (IJavaScriptExecutor)driver;
    vars = new Dictionary<string, object>();
  }
  [TearDown]
  protected void TearDown() {
    driver.Quit();
  }
  [Test]
  public void login() {
    driver.Navigate().GoToUrl("http://localhost:3000/login");
    driver.Manage().Window.Size = new System.Drawing.Size(1174, 833);
    driver.FindElement(By.CssSelector(".form-control_username")).Click();
    driver.FindElement(By.CssSelector(".form-control_username")).SendKeys("onethree");
    driver.FindElement(By.CssSelector(".form-control_password")).Click();
    driver.FindElement(By.CssSelector(".form-control_password")).Click();
    driver.FindElement(By.CssSelector(".form-control_password")).SendKeys("123456");
    driver.FindElement(By.CssSelector(".far")).Click();
    driver.FindElement(By.CssSelector(".far")).Click();
    {
      var element = driver.FindElement(By.CssSelector(".far"));
      Actions builder = new Actions(driver);
      builder.DoubleClick(element).Perform();
    }
    driver.FindElement(By.CssSelector(".btn-login")).Click();
    driver.FindElement(By.CssSelector(".fas")).Click();
    driver.FindElement(By.CssSelector(".form-control_username")).Click();
    driver.FindElement(By.CssSelector(".form-control_username")).SendKeys("onthree");
    driver.FindElement(By.CssSelector(".form-control_password")).SendKeys("111");
    driver.FindElement(By.CssSelector(".btn-login")).Click();
    driver.FindElement(By.CssSelector(".form-control_username")).Click();
    driver.FindElement(By.CssSelector(".form-control_username")).SendKeys("onthreesss");
    driver.FindElement(By.CssSelector(".btn-login")).Click();
    driver.Close();
  }
}

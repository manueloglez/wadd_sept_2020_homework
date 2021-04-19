class Book
  attr_accessor :title, :authors, :edition
  def initialize(title, authors, edition)
    @title = title
    @authors = authors
    @edition = edition
  end
end

class Library
  def initialize
    @store = []
  end
  def shelve(book)
    @store.push(book)
    @store.sort! {|a, b| a.title <=> b.title}
    self
  end
  def find_by_title title
    @store.select {|e| e.title.downcase.include?(title.downcase)}.first
  end
  def list
    @store
  end
end